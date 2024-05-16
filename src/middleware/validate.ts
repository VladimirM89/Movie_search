import { HTTP_STATUS_CODE } from "@/constants/enums";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectSchema, AnyObject } from "yup";

const validate = (schema: ObjectSchema<AnyObject>, handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(error);
    }
  };
};

export default validate;
