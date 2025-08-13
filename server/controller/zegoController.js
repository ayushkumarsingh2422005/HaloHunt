// this is zego controller file

import { generateToken04 } from "../utils/zegoServerAssistant.js";
import dotenv from 'dotenv';

dotenv.config();

export const getZegoToken = async (req, res) => {
    const { userID } = req.query;
    // Only issue a token for the authenticated user themselves
    if (!req.user || !req.user.id || req.user.id.toString() !== String(userID)) {
        return res.status(403).json({ message: 'Forbidden: cannot issue token for another user' });
    }
    const token = generateToken04(parseInt(process.env.ZEGO_APP_ID), userID, process.env.ZEGO_SERVER_SECRET, 3600, '');
    res.json({ token });
};