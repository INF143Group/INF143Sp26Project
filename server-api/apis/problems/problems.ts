import {supabase} from '../../../utils/supabase.js';
import {uploadProblemImage} from './imageUpload.js';

export async function getApprovedProblems(){
  const {data, error} = await supabase
    .from('problems')
    .select('*')
    .eq('status', 'approved');
  if (error) throw error;
  return {success: true, problems: data};
}

export async function getAllProblems(){
  const {data, error} = await supabase
    .from('problems')
    .select('*');
  if (error) throw error;
  return {success: true, problems: data};
}

export async function getProblemById(id){
  const {data, error} = await supabase
    .from('problems')
    .select('*')
    .eq('problem_id', id)
    .single();
  if (error) throw error;
  return {success: true, problem: data};
}

export async function submitProblem(req, res){
  try {
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadProblemImage(req.file);
    }
    const {name, description, difficulty, tags, submitted_by} = req.body;
    const {data, error} = await supabase
      .from('problems')
      .insert( {name, description, difficulty, tags, image_url: imageUrl, submitted_by, status: 'pending'})
      .select()
      .single();
    if (error) throw error;
    res.send({success: true, problem: data});
  } catch (e) {
    res.status(500).send( {success: false, msg: e.message});
  }
}

export async function reviewProblem(req, res){
  try {
    const {status, reviewed_by} = req.body;
    const {data, error} = await supabase
      .from('problems')
      .update( {status, reviewed_by, updated_at: new Date()})
      .eq('problem_id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.send({success: true, problem: data});
  } catch (e) {
    res.status(500).send({success: false, msg: e.message});
  }
}