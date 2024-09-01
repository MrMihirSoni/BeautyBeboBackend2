const AddressModel = require("../models/address.model");

const addAddress = async (req, res) => {
  const { userId, userName, city, state, pincode, street, landmark } = req.body;
  try {
    const newAddress = new AddressModel({
      userId,
      userName,
      city,
      state,
      pincode,
      street,
      landmark,
    });
    await newAddress.save();
    res
      .status(201)
      .json({ message: "new address is added!", address: newAddress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  const data = req.body;
  try {
    const addressToUpdate = await AddressModel.findOne({ _id: addressId });
    if (!addressToUpdate) throw new Error("Enter valid address id!");
    else {
      if (req.body.userId !== addressToUpdate.userId)
        throw new Error(
          "You are not authorised to update someone else's address!"
        );
      else {
        await AddressModel.findByIdAndUpdate(addressId, data);
        res.status(201).json({ message: "address updated!" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const addressId = req.params.id;
  try {
    const addressToDelete = await AddressModel.findOne({ _id: addressId });
    if (!addressToDelete) throw new Error("Enter valid address id!");
    else {
      if (req.body.userId !== addressToDelete.userId)
        throw new Error(
          "You are not authorised to update someone else's address!"
        );
      else {
        await AddressModel.findByIdAndDelete(addressId);
        res.status(200).json({ message: "address removed!" });
      }
    }
    if (await AddressModel.findOne({ _id: addressId })) {
      await AddressModel.findByIdAndDelete(addressId);
      res.status(200).json({ message: "address removed!" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const showAddress = async (req, res) => {
  const userId = req.body.userId;
  try {
    const myAddresses = await AddressModel.find({ userId });
    if (myAddresses.length === 0)
      throw new Error("Please add an address first");
    else {
      res
        .status(200)
        .json({ message: "Here's all your addresses", address: myAddresses });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addAddress, updateAddress, deleteAddress, showAddress };
