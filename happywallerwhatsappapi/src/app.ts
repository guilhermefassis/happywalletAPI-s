import Sender from "./sender";
import express, { Request, Response } from "express";

const sender = new Sender();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/status', (req: Request, res: Response) => {
    try {
        res.status(200).send({
            qr_code: sender.qrCode,
            connected: sender.isConnected
        })
    } catch {
        res.status(400).send({message: "invalid request"})
    }
});

app.post('/send', async (req: Request, res: Response) => {
    try{ 
        const {number, message } = req.body;
        await sender.sendText(number, message);
        return res.status(200).json();
    } catch(err) {
        res.status(400).send({message: "invalid number"})
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server starter'))
