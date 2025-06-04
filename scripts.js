document.addEventListener('DOMContentLoaded', function() {
    // Carregar o Header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                // Re-inicializar o script do menu hamburguer APÓS o header ser carregado
                initializeMobileMenu();
            } else {
                console.error('Elemento #header-placeholder não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o header:', error);
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = '<p style="text-align:center; color:red;">Erro ao carregar o cabeçalho.</p>';
            }
        });

    // Carregar o Contato (se existir o placeholder)
    const contatoPlaceholder = document.getElementById('secao-contato');
    if (contatoPlaceholder) {
        fetch('contato.html')
            .then(response => {
                 if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                 }
                 return response.text();
            })
            .then(data => {
                contatoPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar a seção de contato:', error);
                contatoPlaceholder.innerHTML = `
                   <p style="text-align:center; color:#e1306c;">
                       ⚠️ Erro ao carregar a seção de contato.
                   </p>
               `;
            });
    }
});

// Função para inicializar o menu hamburguer
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    } else {
        // Tenta novamente após um pequeno atraso se os elementos não foram encontrados imediatamente
        setTimeout(() => {
             const menuToggleRetry = document.getElementById('menu-toggle');
             const mainNavRetry = document.getElementById('main-nav');
             if (menuToggleRetry && mainNavRetry) {
                 menuToggleRetry.addEventListener('click', () => {
                    menuToggleRetry.classList.toggle('active');
                    mainNavRetry.classList.toggle('active');
                 });
             } else {
                 console.error('Elementos do menu hamburguer (#menu-toggle ou #main-nav) não encontrados após o carregamento do header.');
             }
        }, 50); // Atraso de 50ms
    }
}

