const canvas = document.getElementById('roleta');
const ctx = canvas.getContext('2d');
const inputNomes = document.getElementById('nomesInput');
const modal = document.getElementById('modalResultado');
const textoVencedor = document.getElementById('textoVencedor');

let nomes = [];
let cores = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3357', '#F3FF33', '#33FFF3'];
let anguloAtual = 0;


function desenharRoleta() {
    nomes = inputNomes.value.split('\n').filter(name => name.trim() !== '');
    
    if (nomes.length === 0) return;

    const numFatias = nomes.length;
    const arco = (2 * Math.PI) / numFatias; 
    const raio = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    for (let i = 0; i < numFatias; i++) {
        const angulo = i * arco;

        ctx.beginPath();
        ctx.fillStyle = cores[i % cores.length]; 
        ctx.moveTo(raio, raio); 
        ctx.arc(raio, raio, raio, angulo, angulo + arco);
        ctx.lineTo(raio, raio);
        ctx.fill();

        ctx.save();
        ctx.translate(raio, raio);
        ctx.rotate(angulo + arco / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.fillText(nomes[i], raio - 10, 10);
        ctx.restore();
    }
}


function girar() {
    if (nomes.length === 0) {
        alert("Adicione nomes primeiro!");
        return;
    }

    const giroExtra = Math.floor(Math.random() * 360); 
    const totalGiro = 1800 + giroExtra; 
    anguloAtual += totalGiro;
    canvas.style.transform = `rotate(-${anguloAtual}deg)`; 

    setTimeout(() => {
        mostrarVencedor(anguloAtual);
    }, 4000);
}

function mostrarVencedor(anguloTotal) {
    
    const numFatias = nomes.length;
    const grausPorFatia = 360 / numFatias;
    const anguloFinal = anguloTotal % 360;
    let indiceVencedor = Math.floor(anguloFinal / grausPorFatia);
    indiceVencedor = (numFatias - indiceVencedor) % numFatias;
    textoVencedor.innerText = nomes[indiceVencedor];
    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
}

desenharRoleta();