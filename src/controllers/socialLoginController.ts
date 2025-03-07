import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/api.error';
const socialLoginService = require('../services/socialLoginService');

async function kakaoLoginController(req: Request, res: Response) {
   try {
      const deviceId = req.query.device_id; // 추후 access_token으로 대체
      return res.redirect(
         `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_APP_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&state=${deviceId}`,
      );
   } catch (error) {
      const err = error as ApiError;
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
   }
}

async function kakaoAuthController(req: Request, res: Response) {
   try {
      const authCode = req.query.code;
      const deviceId = req.query.state;
      const data = await socialLoginService.kakaoLoginService(authCode, deviceId);
      return res.redirect(
         `http://localhost:3000/loginRedirect?access_token=${data.access_token}&refresh_token=${data.refresh_token}`,
      ); // redirect
   } catch (error) {
      const err = error as ApiError;
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
   }
}

module.exports = { kakaoLoginController, kakaoAuthController };
