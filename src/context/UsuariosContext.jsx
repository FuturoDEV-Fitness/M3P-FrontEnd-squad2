import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const UsuariosContext = createContext();
let url = "http://localhost:3000/usuarios";
export const UsuariosContextProvider = ({ children }) => {
 const { data, loading, isVisible } = useFetch(url);

 const [usuarios, setUsuarios] = useState([]);
 const [senhaError, setSenhaError] = useState(null);
 const [cpfError, setCpfError] = useState(null);
 const [emailError, setEmailError] = useState(null);

 useEffect(() => {
  if (!loading && data) {
   setUsuarios(data);
  }
 }, [data, loading]);

 async function lerUsuariosDb() {
  try {
   let res = await fetch(url);
   let data = await res.json();
   setUsuarios(data);
  } catch (err) {
   alert(err);
  }
 }

 function onSubmitFormCadastro(formCadastro) {
  if (usuarios.find((user) => user.email === formCadastro.email)) {
   setEmailError("Email já cadastrado");
   setCpfError(null);
   setSenhaError(null);
   return;
  }
  if (usuarios.find((user) => user.cpf === formCadastro.cpf)) {
   setCpfError("CPF já cadastrado");
   setSenhaError(null);
   setEmailError(null);
   return;
  }
  if (formCadastro.senha !== formCadastro.confirmar_senha) {
   setSenhaError("As senhas precisam ser iguais");
   setCpfError(null);
   setEmailError(null);
   return;
  }

  setCpfError(null);
  setSenhaError(null);
  setEmailError(null);
  cadastrarUsuarioDb(formCadastro);
  gotoLogin();
 }

 function cadastrarUsuarioDb(formCadastro) {
  fetch(url, {
   method: "POST",
   body: JSON.stringify(formCadastro),
   headers: {
    "Content-Type": "application/json"
   }
  })
   .then(() => {
    lerUsuariosDb();
    alert("Usuário cadastrado com sucesso!");
   })
   .catch(() => alert("Erro ao cadastrar usuário!"));
 }

 async function onSubmitFormLogin(formLogin) {
  try {
   let userLogged = false;
   let usuarioEncontrado = usuarios.find(
    (user) => user.email == formLogin.email
   );

   if (usuarioEncontrado) {
    if (usuarioEncontrado.senha === formLogin.senha) {
     setSenhaError(null);
     setEmailError(null);
     userLogged = true;
     localStorage.setItem("userLogged", userLogged);
     localStorage.setItem("userId", JSON.stringify(usuarioEncontrado.id));
     atualizarStatus(usuarioEncontrado, usuarioEncontrado.id);
     window.location.href = "/";
    } else {
     setSenhaError("Senha inválida");
     setEmailError(null);
    }
   } else {
    setEmailError("Email inválido");
    setSenhaError(null);
   }
  } catch (err) {
   console.log(err);
  }
 }

 async function atualizarStatus(usuario, id) {
  try {
   const usuarioAtualizado = {
    ...usuario,
    online: !usuario.online
   };
   await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(usuarioAtualizado),
    headers: {
     "Content-Type": "application/json"
    }
   });
   lerUsuariosDb();
  } catch (err) {
   console.log(err);
  }
 }

 async function logout(id) {
  try {
   let res = await fetch(`http://localhost:3000/usuarios/${id}`);
   let data = await res.json();
   const usuarioLogged = {
    ...data,
    online: !data.online
   };
   await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(usuarioLogged),
    headers: {
     "Content-Type": "application/json"
    }
   });
   window.location.href = "/login";
   localStorage.clear();
  } catch (err) {
   alert(err);
  }
 }

 function gotoLogin() {
  window.location.href = "/login";
 }

 function gotoRegister() {
  window.location.href = "/cadastro-usuario";
 }

 function atualizarPerfil(form) {
  if (form.senha === form.confirmar_senha) {
   let id = JSON.parse(localStorage.getItem("userId"));
   fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(form),
    headers: {
     "Content-Type": "application/json"
    }
   });
   fetch("http://localhost:3000/exercicios")
    .then((res) => res.json())
    .then((data) => {
     const exercicios = Array.isArray(data) ? data : [];
     for (const exercicio of exercicios) {
      if (exercicio.id_usuario === form.id) {
       exercicio.nome_usuario = form.nome;
       console.log(exercicio);
       fetch(`http://localhost:3000/exercicios/${exercicio.id}`, {
        method: "PUT",
        body: JSON.stringify(exercicio),
        headers: {
         "Content-Type": "application/json"
        }
       });
      }
     }
    });
   return;
  }
  if (form.senha !== form.confirmar_senha) {
   alert("As senhas precisam ser iguais");
   return;
  }
 }

 function excluirUsuario(id) {
  fetch("http://localhost:3000/exercicios")
   .then((res) => res.json())
   .then((data) => {
    const locaisUsuario = data.filter((data) => data.id_usuario === id);
    if (locaisUsuario.length > 0) {
     alert(
      "Não foi possível excluir o usuário, existe locais vinculados a ele"
     );
     return;
    }
    if (confirm("Tem certeza que deseja excluir o usuário?")) {
     fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "DELETE",
      headers: {
       "Content-Type": "application/json"
      }
     });
     window.location.href = "/";
     localStorage.clear();
    }
   });
 }

 const options = [
  {
   label: "Masculino",
   value: "Masculino"
  },
  {
   label: "Feminino",
   value: "Feminino"
  },
  {
   label: "Outro",
   value: "Outro"
  }
 ];

 return (
  <UsuariosContext.Provider
   value={{
    usuarios,
    loading,
    isVisible,
    setUsuarios,
    onSubmitFormCadastro,
    onSubmitFormLogin,
    gotoLogin,
    gotoRegister,
    senhaError,
    cpfError,
    emailError,
    options,
    logout,
    atualizarPerfil,
    excluirUsuario
   }}>
   {children}
  </UsuariosContext.Provider>
 );
};