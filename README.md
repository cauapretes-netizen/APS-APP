
# Arquitetura do app Barbearia:

- Tela inicial aparece Login/Cadastro
- Feito o Login ou Cadastro como cliente:
	-  Tela com card de agendamentos de cortes

- Feito o Login ou Cadastro como Barbeiro:
	- Agendamentos disponíveis




# Detalhes Técnicos:

### Login/Cadastro:

- Quando a pessoa logar, será necessário fazer um cadastro se for sua primeira vez utilizando o app, quando o cadastro for concluído, será salvo no arquivo ***database.json*** 
	- Cada cadastro será um obj de usuário, com os seguintes campos:
		- Nome
		- Login:
		- Tipo: (Cliente ou Barbeiro)
		- Agendamentos: (se for cliente vai aparecer os cortes que foram agendados, se for barbeiro, vai aparecer todos os agendamentos de todos os usuários)

- Login terá que ter validação de caracteres (Login: nome com no minimo 4 digitos, Senha entre 8 a 12 digitos)
- Caso o usuário tente fazer login que não existe, vai avisar que o login está errado ou ele precisa fazer cadastro ainda
- Os dados inseridos no login vão ser comparados com o obj do **database.json**

### Agendamentos (Cliente):

- Quando o usuário (Cliente) fizer login, será jogado para tela de agendamento, onde conseguirá escolher o seu corte e data/horário de agendamento

- Quando o usuário agendar o seu corte, será salvo no seu determinado obj no arquivo **database.json** (No campo "Agendamentos")

- No final da página terá um botão para ele poder fazer uma consulta de quais agendamentos ele tem, podendo cancela-los


### Agendamentos (Barbeiro):

- Quando o usuário (Barbeiro) fizer login, será jogado para uma tela onde irá aparecer todos os agendamentos disponíveis (Vai puxar todos os obj que **Tipo = Usuário** e que tenha o campo "Agendamento "disponível, do arquivo **database.json**)

- O usuário conseguirá ver todas as informações como: Tipo de corte, Nome do Cliente, Data/Horário etc
- Ele também conseguirá cancelar o agendamento e informar um motivo (opcional)

# TO DO LIST:

- Tela de cadastro
- Agendamento funcional (integração com o "database")
- Tela de usuário (Barbeiro)
  	- Lógica para o barbeiro não acessar a tela de cliente
- Logica de input de senha
- Banco de dados no geral (Isaac)
- Vídeo (todos tem que participar)
- Botão no final da tela de agendamentos do usuário



A tela Home do Cliente exibe três cards de serviços — Barba Completa, Corte Infantil e Corte Clássico — cada um com foto, descrição, duração e preço. Ao clicar na seta de um card, o usuário é levado para a tela de Details, onde escolhe o dia da semana e o horário. Ao confirmar, addAgendamento salva o agendamento com ID, serviço, preço, duração e horário.
Já a tela Home do Barbeiro carrega todos os agendamentos na montagem da tela via getAllAgendamentos. Cada agendamento aparece em um card com nome do cliente, serviço, horário, duração e preço. No topo de cada card há um botão de lixeira — ao pressionar, cancelAgendamento remove o agendamento do banco e o card desaparece da tela instantaneamente, sem precisar recarregar.
No geral, o App.js conecta interface e banco de forma limpa, com cada tela tendo sua responsabilidade bem definida."
