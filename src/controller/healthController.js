export const getHealthController = async (req, res) => {
  try {
    res.status(200).json({ data: "Health connected" });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};