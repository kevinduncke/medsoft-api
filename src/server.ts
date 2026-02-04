import { createApp } from './app';

const PORT = process.env.PORT || 4000;

const app = createApp();

app.listen(PORT, () => {
    console.log(`Medsoft API listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/health`);
});