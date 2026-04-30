import { PartialType } from "@nestjs/mapped-types";
import e from "express";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {}