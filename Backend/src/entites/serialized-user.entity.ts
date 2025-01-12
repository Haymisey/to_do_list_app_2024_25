import { Exclude, Expose } from "class-transformer";
// The @Exclude() decorator is applied to the class to exclude all properties 
// from being serialized by default. Any property without @Expose() will not be included
// in the serialized output.
@Exclude()
export class UserEntity {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: "admin" | "user";

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
