import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { deleteDoc, doc } from 'firebase/firestore'

import { type Memo } from '../../types/memo'
import { auth, db } from '../config'

interface Props {
  memo: Memo
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  Alert.alert('メモを削除します', '宜しいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      // iosだけ赤くなる
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
          .catch(() => { Alert.alert('削除に失敗しました') })
      }
    }
  ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props
  const { bodyText, updateAt } = memo
  if (bodyText === null || updateAt === null) { return null }
  const dateString = updateAt.toDate().toLocaleDateString('ja-JP')
  return (
    <Link
      href={{ pathname: '/memo/detail', params: { id: memo.id } }}
      asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemData}>{dateString}</Text>
        </View>
        <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
          <FontAwesome name='close' size={30} color='#B0B0B0' />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0,15)'
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  memoListItemData: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484'
  }
})

export default MemoListItem
