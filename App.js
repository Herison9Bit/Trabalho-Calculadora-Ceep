import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';

export default function App() {
  // Estados
  const [tela, setTela] = useState('home');
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [resultado, setResultado] = useState(null);

  const MEDIA_MINIMA = 6.0;

  const calcularMedia = () => {
    const n1 = parseFloat(nota1.replace(',', '.'));
    const n2 = parseFloat(nota2.replace(',', '.'));
    const n3 = parseFloat(nota3.replace(',', '.'));

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      Alert.alert('Erro', 'Por favor, insira as três notas corretamente.');
      return;
    }

    if (n1 > 10 || n2 > 10 || n3 > 10 || n1 < 0 || n2 < 0 || n3 < 0) {
      Alert.alert('Atenção', 'As notas devem ser entre 0.0 e 10.0');
      return;
    }

    const mediaFinal = (n1 + n2 + n3) / 3;
    setResultado(mediaFinal);
  };

  const resetarCalculadora = () => {
    setResultado(null);
    setNota1('');
    setNota2('');
    setNota3('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* TELA 1: HOME */}
        {tela === 'home' && (
          <View style={styles.card}>
            <Text style={styles.titulo}>Portal Acadêmico</Text>
            <Text style={styles.label}>Nome do Estudante:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: João Silva"
              value={nome}
              onChangeText={setNome}
            />
            <TouchableOpacity 
              style={styles.botao} 
              onPress={() => nome.trim() ? setTela('menu') : Alert.alert('Ops!', 'Digite seu nome')}
            >
              <Text style={styles.botaoTexto}>Bem-vindo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TELA 2: MENU */}
        {tela === 'menu' && (
          <View style={styles.card}>
            <Text style={styles.titulo}>Olá, {nome}!</Text>
            <TouchableOpacity style={styles.botao} onPress={() => setTela('calculadora')}>
              <Text style={styles.botaoTexto}>Calculadora de Médias</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.botao, { backgroundColor: '#ccc', marginTop: 10 }]} 
              onPress={() => { setTela('home'); setNome(''); }}
            >
              <Text style={[styles.botaoTexto, { color: '#333' }]}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TELA 3: CALCULADORA */}
        {tela === 'calculadora' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={styles.card}>
              <Text style={styles.titulo}>Notas Trimestrais</Text>
              
              <Text style={styles.label}>1º Trimestre</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={nota1} onChangeText={setNota1} placeholder="0.0" />
              
              <Text style={styles.label}>2º Trimestre</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={nota2} onChangeText={setNota2} placeholder="0.0" />
              
              <Text style={styles.label}>3º Trimestre</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={nota3} onChangeText={setNota3} placeholder="0.0" />

              <TouchableOpacity style={[styles.botao, { backgroundColor: '#2196F3' }]} onPress={calcularMedia}>
                <Text style={styles.botaoTexto}>Calcular Resultado</Text>
              </TouchableOpacity>

              {resultado !== null && (
                <View style={styles.resultadoBox}>
                  <Text style={styles.resultadoTexto}>Média Final: {resultado.toFixed(1)}</Text>
                  {resultado >= MEDIA_MINIMA ? (
                    <View>
                      <Text style={styles.statusAprovado}>Status: APROVADO</Text>
                      <TouchableOpacity style={[styles.botao, { backgroundColor: '#2ecc71' }]} onPress={() => Alert.alert('Secretaria', 'Matrícula realizada!')}>
                        <Text style={styles.botaoTexto}>Matrícula em novo curso</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.statusReprovado}>Status: REPROVADO</Text>
                      <Text style={styles.faltaTexto}>Faltam {(MEDIA_MINIMA - resultado).toFixed(1)} pontos.</Text>
                      <TouchableOpacity style={[styles.botao, { backgroundColor: '#e74c3c' }]} onPress={() => Alert.alert('Secretaria', 'Iniciando rematrícula...')}>
                        <Text style={styles.botaoTexto}>Ir para rematrícula</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => { setTela('menu'); resetarCalculadora(); }}>
                <Text style={styles.linkVoltar}>Voltar ao Menu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#2c3e50' },
  label: { fontSize: 14, color: '#7f8c8d', marginBottom: 5, fontWeight: '600' },
  input: { height: 50, borderWidth: 1, borderColor: '#dcdde1', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#fafafa' },
  botao: { backgroundColor: '#3498db', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultadoBox: { marginTop: 25, padding: 15, borderRadius: 10, backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#eee' },
  resultadoTexto: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  statusAprovado: { color: '#2ecc71', fontWeight: 'bold', textAlign: 'center', marginVertical: 10, fontSize: 18 },
  statusReprovado: { color: '#e74c3c', fontWeight: 'bold', textAlign: 'center', marginVertical: 10, fontSize: 18 },
  faltaTexto: { textAlign: 'center', color: '#7f8c8d', marginBottom: 10 },
  linkVoltar: { color: '#3498db', fontWeight: 'bold', textDecorationLine: 'underline' }
});
