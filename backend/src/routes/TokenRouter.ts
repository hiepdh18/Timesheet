import { BaseRouter } from "./BaseRouter";
import { AuthenticateResultDTO } from "./outdtos";
import TokenService from "../services/token/TokenService";

/**
 * @description TokenRouter.
 */

const fake: AuthenticateResultDTO = {
  result:
  {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6Ijk5NjU5ZDVlLTFjMGUtODI3Mi03YzI2LTM5ZmRiYmI1NDViZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6IjRkNTdkOTVkLWMxN2YtNGI1ZS1iZWY4LTNjN2QzZWQ1YTEzYSIsImlhdCI6MTYyNzE4MTg1NiwibmJmIjoxNjI3MTgxODU2LCJleHAiOjE2MzU4MjE4NTYsImlzcyI6IlRpbWVzaGVldCIsImF1ZCI6IlRpbWVzaGVldCJ9.EBAQNSuYp9cg-ZZK6OdJrUbcOoCiqbq6g2hadlCRMww",
    encryptedAccessToken: "wNYmO41/48SHNstaLVXxHCCre29BZQl1NhC6NM3R3rzpXtPQxVzH6jEzA/QhXFN5tu6Fk7pO53uppm1mVXMZgxbyRVz26dnepi/FyB6axBY+6gq1GL+uRQgoiFUCjRN2p8w6LevViwKlHyWZZJZO1DGVSjAi1m2U+og9pkHw9/QR4Nl/DPnoP9JYDMpZ1zxx09u6s0GZ9/Q5Sjk+L0UfcSCbl38X8he5w9UIn/Hvxh7ysM1CiPLsoOwtbiieSRVmrmt0JjnipAn4/K283F8GrGwzwgehWsqefmUnM0ckMwP9ZAdwQxWDhxv0IqNw4tDhwUYs/1SYdYozdNzgByhgNOBPzQDObNLlWc4vV5VMOiagOCq7H/EfLUAQAphoyG+G444/jp74ldQe5l3t295wcIj+T0jvFEonLFLxm45xDNCeY6GYp6wb3pzleRv9K97Lm3MFej4Vi5CWtjnI5AiJqpwSC5HNrmJ8RwHjlrupSyK+uIXEO0We0kNdSHdv3yME6jLvCgyjrhN4FglP03RXo7fTD161h9y69KQOXfWUApioYDN6+mK6fujO0ZsHvP28Tr4TSIGNZDeXVONRzZ719epdGpzOfiD5l7lZlK3g990m6LHXESuRpgIp9IhyGM3FwmlqyCnQnStD/VXwPrbAawOVrfPk2VtRnRDoenYpNXIp++zYCsKUNCX7rlOqbJWI1cqslnLvV/K0jzEHA45dZgbkWjJ2OtOeYuHZDf+jT5ESrvZCYFd5ihbMoKwF+1vzr4SxztPUCZz+GlffHDeQVbKfLktdw3yRjvdXlYKKjcLy4iffV9z/itUkMr5iF/94XlibSdANCQt9Ad2sTjA9gm19el6GnmU8rM6sQo/AwBc=",
    expireInSeconds: 8640000,
    userId: 1
  }, targetUrl: null, success: true, error: null, unAuthorizedRequest: false, __abp: true
}
class TokenAuthRouter extends BaseRouter {
  private _service = TokenService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post("/Authenticate", this._service.authenticate );
    // this.router.post("/Authenticate", (req: Request, res: Response, next: NextFunction) => {
    //   const user: AuthenticateDTO = req.body;
    //   res.status(200).json(fake)
    // });
  }
}

export = new TokenAuthRouter().router;
