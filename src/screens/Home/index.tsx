import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export function Home() {
    const [participants, setParticipants] = useState<string[ ]>([]);
    const [input, setInput] = useState('');

    function handleParticipantAdd() {
        if (participants.includes(input)) {
            return Alert.alert("Participante existe", "Já exist um participante na lista com esse nome.")
        }

        setParticipants(prevState => [...prevState, input]);
        setInput('');
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>
            
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6b6b6b"
                    value={input}
                    onChangeText={setInput}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant 
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}  
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantesa sua lista de presença.</Text>
                )}
            />
        </View>
    );
}