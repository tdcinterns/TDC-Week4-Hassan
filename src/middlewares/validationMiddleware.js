const validateTaskPayload = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!description || description.trim() === '') {
        return res.status(400).json({ message: 'Description is required' });
      }
  
    next();
  };
  
  module.exports = { validateTaskPayload };
  