import { Request, Response } from "express";
import { iAddressReturn, iRequestRealEstate, iResponseRealEstate, iRealEstatesWithoutCategoryReturn } from "../interfaces/realEstate.interfaces";
import listRealEstatesService from "../services/realEstate/listRealEstates.service";
import createRealEstateService from "../services/realEstate/createRealEstate.service";

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateData: iRequestRealEstate = req.body;
  const realEstateAddress: iAddressReturn = req.body.address;

  const newRealEstate: iResponseRealEstate = await createRealEstateService(
    realEstateData,
    realEstateAddress
  );

  return res.status(201).json(newRealEstate);
};

const listRealEstatesController = async (req: Request, res: Response): Promise<Response> => {

  const realEstates: iRealEstatesWithoutCategoryReturn = await listRealEstatesService();

  return res.status(200).json(realEstates);
};

export { createRealEstateController, listRealEstatesController };
