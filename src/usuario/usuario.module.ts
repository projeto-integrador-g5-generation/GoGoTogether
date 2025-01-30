import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.service";


@Module ({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService], 
    controllers: [UsuarioController], 
    exports: [UsuarioService], 
})
export class UsuarioModule {}