import { createError } from "../error.js";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import { isValidObjectId } from 'mongoose';

export const Update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateduser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updateduser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(404, "You can only delete your account"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("The Requested user has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(404, "You can only delete your account"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const subscribe = async (req, res, next) => {
  try {
   const isub = await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    },{new: true});
   const gotsub = await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 } }, { new : true});

    res.status(200).json({isub , gotsub});
  } catch (err) {
    next(err);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    const isub = await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.id },
    }, { new : true});
  const gotsub =  await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 } }, { new: true});

    res.status(200).json({isub, gotsub});
  } catch (err) {
    next(err);
  }
};
export const like = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;

    

    const likeaddedVideo = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { disLikes: id },
    },{
      new: true,
    });

    res.status(200).json(likeaddedVideo);
  }  catch (err) {
    if (err.name === 'MongoServerError' && err.code === 16837) {
      
      return res.status(400).json({ error: 'Invalid operation on likes field' });
    }
    console.error(err); 
    next(err);
  }
};

//   const id = req.user.id;
//   const videoId = req.params.id;

//   try {
//     const dislikedVideo = await Video.findByIdAndUpdate(videoId, {
//       $addToSet: { disLikes: id },
//       $pull: { likes: id },
//     }, {
//       new: true,
//     });

//     res.status(200).json(dislikedVideo);
//   } catch (err) {
//     next(err);
//   }
// };
export const disLike = async (req, res, next) => {
  console.log(req.params.videoId);
  const userId = req.user.id;
  const videoId = req.params.videoId;
  console.log(req.params.videoId);
  // Validate user ID and video ID
  if (!isValidObjectId(userId) || !isValidObjectId(videoId)) {
    return res.status(400).json({ error: 'Invalid user ID or video ID' });
  }

  try {
    const dislikedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { disLikes: userId },
        $pull: { likes: userId },
      },
      {
        new: true,
      }
    );

    if (!dislikedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.status(200).json(dislikedVideo);
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 16837) {
      return res.status(400).json({ error: 'Invalid operation on likes field' });
    }
    console.error(err); 
    next(err);
  }
};




export const Alluser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
};
