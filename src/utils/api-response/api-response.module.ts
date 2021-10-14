import { Global, Module } from "@nestjs/common";
import { ApiResponseService } from "./services/api-response.service";

@Global()
@Module({
  providers: [ApiResponseService],
  exports: [ApiResponseService],
})
export class ApiResponseModule {}
