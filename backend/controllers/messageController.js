const Message = require("../models/Message");
const sanitize = require("mongo-sanitize");
const nodemailer = require("nodemailer");

exports.createMessage = async (req, res) => {
  try {
    
    const { name, surname, email, message } = req.body;

    const newMessage = new Message({
      name: sanitize(name),
      surname: sanitize(surname),
      email: sanitize(email),
      message: sanitize(message)
    });

    await newMessage.save();
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      secure: false
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: sanitize(email),
      to: process.env.EMAIL_USER,
      subject: "New message from portfolio contact form",
      html: `
        <div style='font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 5px;'>
          <h1 style='color: #ff4500'>New Message</h1>
          <p>You have received a new message from your portfolio contact form.</p>
          <p><strong>Name:</strong> ${sanitize(name)} ${sanitize(surname)}</p>
          <p><strong>Email:</strong> ${sanitize(email)}</p>
          <em>Please go to your admin panel to view the message. <a href='http://localhost:5173/dashboard'>Messages</a></em>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({  error: "An error occurred while sending the message."});
  }
}

exports.getMessages = async (req, res) => {
  try {
    
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching messages." });
  }
}

exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findOne({ _id: sanitize(id) });
    if (!message) {
      res.status(404).send("Message not found.")
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching the message." });
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findOneAndDelete({ _id: sanitize(id) });
    if (!message) {
      res.status(404).send("Message not found.")
    }
    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting message." });
  }
}
