const User = require("../schema");

const uploadGibhli = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const { uname, chainId, address } = req.body;
    console.log("Received Data:", { uname, chainId, address, file: req.file });
    const imagePath = req.file.path.replace("\\", "/");
    let user = await User.findOne({ uname, address });

    if (user) {
      // Update existing user's images array
      user.images.push({
        url: imagePath,
        chainId: chainId || 1, // Default to 1 if undefined
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "Image added successfully", user });
    } else {
      // Create a new user if no existing record found
      user = new User({
        uname,
        address,
        images: [
          {
            url: imagePath,
            chainId: chainId || 1,
          },
        ],
      });

      await user.save();
      return res.status(201).json({ message: "Upload successful", user });
    }
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: "Server Error: " + error.message });
  }
};

const getAllGibhlifys = async (req, res) => {
  let chainId = req.query.chainId;
  console.log("chainId:", chainId);
  if (chainId) {
    chainId = parseInt(chainId);
  }
  try {
    const users = await User.find();
    if (chainId) {
      const gibhlifys = users
        .map((user) => {
          return {
            uname: user.uname,
            address: user.address,
            images: user.images.filter((image) => image.chainId === chainId),
          };
        })
        .filter((user) => user.images.length > 0);
      res.status(200).json({ gibhlifys });
    } else {
      const gibhlifys = users.map((user) => {
        return {
          uname: user.uname,
          address: user.address,
          images: user.images,
        };
      });
      res.status(200).json({ gibhlifys });
    }
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: "Server Error: " + error.message });
  }
};

module.exports = { uploadGibhli, getAllGibhlifys };
