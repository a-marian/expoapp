
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';

type Props = {
    onSelect: (image: ImageSourcePropType) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props){
    const [emoji] = useState<ImageSourcePropType[]>([
        require("../assets/images/emoji/emoji1.jpeg"),
        require("../assets/images/emoji/emoji2.jpeg"),
        require("../assets/images/emoji/emoji3.jpeg"),
        require("../assets/images/emoji/emoji4.jpeg"),
        require("../assets/images/emoji/emoji5.jpeg"),
        require("../assets/images/emoji/emoji6.jpeg"),
    ]);

    return(
        <FlatList
            horizontal
            showHorizontalScrollIndicator= {Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index }) => (
                <Pressable
                onPress={() => {
                    onSelect(item);
                    onCloseModal();
                }}>
                <Image source={item} key={index} style={styles.image} />
            </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
