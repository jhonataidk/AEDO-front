

export interface IPerfil {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface IEndereco {
    id: number;
    logradouro: string;
    cidade: string;
    estado: string;
    cep: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    id_endereco: number;
    id_perfil: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    perfil?: IPerfil;
    endereco?: IEndereco;
}

export interface IHospital {
    id: number;
    nome: string;
    id_endereco: number;
    telefone: string;
    email: string;
    criado_por: number;
    created_at: string;
    updated_at: string;
    endereco: IEndereco;
}
export interface IOrgaos {
    id: number;
    nome: string;
    para_doacao: boolean;
    created_at: string;
    updated_at: string;
}

export interface Credentials {
    email: string;
    password: string;
  }
  
export interface ApiResponse {
    status: number;
    message: string;
    usuario: {
      id: number;
      nome: string;
      email: string;
      telefone: string;
      id_endereco: number;
      id_perfil: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      token: string;
    };
    token: string;
  }
  

export interface IUsuarioOrgao {
    id: number;
    id_usuario: number;
    id_orgao: number;
    created_at: string;
    updated_at: string;
    orgao: IOrgaos;
    usuario: IUsuario;
}