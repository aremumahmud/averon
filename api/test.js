export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, world!', data: { name: 'John', age: 30 } });
}