const Biography = require('../../models/Biography');

module.exports = async (req, res) => {
  try{
    let {
      resume, avatar, gallery, skills, 
      education, otherSkills,
      hobbies, socialHandles, 
      highlights, ...newData
    } = req.body;

    console.log(req.body, "education", education);

    let filesObject = req?.files || null;
    resume = filesObject?.resume? filesObject.resume[0].filename : "";
    avatar = filesObject?.avatar? filesObject.avatar[0].filename : "";
    gallery = filesObject?.files? filesObject.files.map(file => file.filename) : [];
   
    education &&  await Biography.updateOne({name: 'kintu denis'}, { $addToSet: {education: JSON.parse(education)}});
    socialHandles && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {socialHandles:JSON.parse(socialHandles)}});
    highlights && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {highlights:JSON.parse(highlights)}});
    skills && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {skills: JSON.parse(skills)}});
    otherSkills && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {otherSkills: otherSkills}});
    hobbies && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {hobbies: hobbies}});
    gallery && await Biography.updateOne({name: 'kintu denis'}, {$addToSet: {gallery: {$each: gallery}}}); 
    
    
    resume && {...newData, resume};
    avatar && {...newData, avatar};

    console.log(resume, avatar);
    const response = await Biography.updateOne({name: 'kintu denis'}, {...newData});
        
    return res.status(200).json({"message": "Updated successfully"});

  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}