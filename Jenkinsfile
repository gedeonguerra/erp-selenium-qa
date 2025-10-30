pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        PROJECT_NAME = 'erp-selenium-qa'
        BASE_URL = 'https://demo.erpnext.com'
        HEADLESS = 'true'
    }
    
    stages {
        stage('🔧 Preparação') {
            steps {
                echo '════════════════════════════════════════════'
                echo '    Iniciando Pipeline de Testes ERP QA    '
                echo '════════════════════════════════════════════'
                echo "Projeto: ${PROJECT_NAME}"
                echo "Build: #${BUILD_NUMBER}"
                echo "Workspace: ${WORKSPACE}"
            }
        }
        
        stage('📦 Checkout') {
            steps {
                echo '📥 Clonando código do repositório...'
                checkout scm
                echo '✅ Código clonado com sucesso!'
            }
        }
        
        stage('⬇️ Instalar Dependências') {
            steps {
                echo '📦 Instalando pacotes Node.js...'
                sh 'npm ci'
                echo '✅ Dependências instaladas!'
            }
        }
        
        stage('🔍 Testes de Produção') {
            steps {
                echo '🧪 Executando testes de validação em produção...'
                script {
                    try {
                        sh 'npm run test:producao'
                        echo '✅ Testes de produção: PASSOU'
                    } catch (Exception e) {
                        echo '⚠️ Testes de produção: FALHOU'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('✨ Novos Casos de Teste') {
            steps {
                echo '🆕 Executando novos casos desenvolvidos em paralelo...'
                script {
                    try {
                        sh 'npm run test:novos'
                        echo '✅ Novos casos: PASSOU'
                    } catch (Exception e) {
                        echo '⚠️ Novos casos: FALHOU'
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('📊 Gerar Relatórios') {
            steps {
                echo '📈 Gerando relatórios de teste...'
                
                // Arquivar relatórios JSON
                archiveArtifacts artifacts: 'reports/*.json', allowEmptyArchive: true
                
                // Arquivar screenshots (se houver falhas)
                archiveArtifacts artifacts: 'screenshots/**/*.png', allowEmptyArchive: true
                
                echo '✅ Relatórios gerados e arquivados!'
            }
        }
        
        stage('📧 Notificação') {
            steps {
                echo '📬 Preparando notificações...'
                script {
                    def status = currentBuild.result ?: 'SUCCESS'
                    echo "Status final: ${status}"
                    
                    if (status == 'SUCCESS') {
                        echo '✅ Todos os testes passaram!'
                        echo '🎉 Build concluído com sucesso!'
                    } else {
                        echo '⚠️ Alguns testes falharam'
                        echo '🔍 Verificar relatórios para detalhes'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Limpando workspace...'
            cleanWs()
        }
        
        success {
            echo '════════════════════════════════════════════'
            echo '   ✅ PIPELINE EXECUTADO COM SUCESSO! ✅   '
            echo '════════════════════════════════════════════'
            echo "Build #${BUILD_NUMBER} concluído"
            echo "Tempo: ${currentBuild.durationString}"
        }
        
        failure {
            echo '════════════════════════════════════════════'
            echo '      ❌ PIPELINE FALHOU - VERIFICAR ❌     '
            echo '════════════════════════════════════════════'
            echo "Build #${BUILD_NUMBER} com erros"
            echo "Verificar logs e relatórios"
        }
        
        unstable {
            echo '════════════════════════════════════════════'
            echo '    ⚠️ PIPELINE INSTÁVEL - ATENÇÃO! ⚠️     '
            echo '════════════════════════════════════════════'
            echo "Build #${BUILD_NUMBER} com testes falhando"
            echo "Alguns testes não passaram"
        }
    }
}