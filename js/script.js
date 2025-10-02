document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const user = "edgar@portfolio";
    const host = "dev";
    const prompt = `<span class="prompt">${user}@${host}:~$</span>`;

    const commands = [
        { cmd: './bienvenida.sh', delay: 1500, output: `
        ███████╗██████╗  ██████╗  █████╗ ██████╗ 
        ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔══██╗
        █████╗  ██║  ██║██║  ███╗███████║██████╔╝
        ██╔══╝  ██║  ██║██║   ██║██╔══██║██╔══██╗
        ███████╗██████╔╝╚██████╔╝██║  ██║██║  ██║
        ╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
        
        <br>
        Bienvenido a mi portfolio interactivo.
        Iniciando sistemas...
        `},
        { cmd: 'whoami', delay: 1000, output: `Edgar Martínez Palacios`},
        { cmd: './sobre-mi.sh', delay: 2000, output: `
        Soy un apasionado desarrollador de aplicaciones web y multiplataforma.
        Mi objetivo es construir soluciones tecnológicas que aporten valor y
        ofrezcan una gran experiencia de usuario.
        `},
        { cmd: 'ls -l skills/', delay: 2500, output: `
        -rwx-r--r-- 1 ${user} dev 1.2K Oct 02 09:30 React
        -rwx-r--r-- 1 ${user} dev 1.5K Oct 02 09:30 Node.js
        -rwx-r--r-- 1 ${user} dev 980B Oct 02 09:30 MongoDB
        -rwx-r--r-- 1 ${user} dev 850B Oct 02 09:30 SQL
        `},
        { cmd: 'cat proyectos.json', delay: 2500, output: `
        [
          {
            "nombre": "Proyecto Alfa",
            "descripcion": "Una increíble aplicación web construida con el stack MERN.",
            "repo": "<a href='#' target='_blank'>github.com/tu-usuario/proyecto-alfa</a>"
          },
          {
            "nombre": "Proyecto Beta",
            "descripcion": "Aplicación multiplataforma para gestionar tareas.",
            "repo": "<a href='#' target='_blank'>github.com/tu-usuario/proyecto-beta</a>"
          }
        ]
        `},
        { cmd: './contacto.sh', delay: 1500, output: `
        Puedes encontrarme en:
        - LinkedIn: <a href="https://linkedin.com/in/tu-usuario" target="_blank">linkedin.com/in/tu-usuario</a>
        - GitHub:   <a href="https://github.com/tu-usuario" target="_blank">github.com/tu-usuario</a>
        `},
        { cmd: 'exit', delay: 500, output: `¡Gracias por tu visita!`},
    ];

    let commandIndex = 0;

    function typeCommand() {
        if (commandIndex >= commands.length) {
            const finalPrompt = document.createElement('div');
            finalPrompt.classList.add('line');
            finalPrompt.innerHTML = `${prompt} <span class="cursor"></span>`;
            content.appendChild(finalPrompt);
            content.scrollTop = content.scrollHeight;
            return;
        }

        const currentCommand = commands[commandIndex];
        const line = document.createElement('div');
        line.classList.add('line');
        line.innerHTML = `${prompt} <span class="command" id="command-${commandIndex}"></span>`;
        content.appendChild(line);

        let charIndex = 0;
        const commandEl = document.getElementById(`command-${commandIndex}`);
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        commandEl.appendChild(cursor);

        const typing = setInterval(() => {
            if (charIndex < currentCommand.cmd.length) {
                commandEl.insertBefore(document.createTextNode(currentCommand.cmd[charIndex]), cursor);
                charIndex++;
                content.scrollTop = content.scrollHeight;
            } else {
                clearInterval(typing);
                cursor.remove();
                showOutput();
            }
        }, 100);
    }

    function showOutput() {
        const currentCommand = commands[commandIndex];
        const outputLine = document.createElement('div');
        outputLine.classList.add('line', 'output');
        outputLine.innerHTML = currentCommand.output;
        content.appendChild(outputLine);
        content.scrollTop = content.scrollHeight;

        commandIndex++;
        setTimeout(typeCommand, currentCommand.delay);
    }

    typeCommand();
});
