
export function getDirectPath(user) {
  // 根据用户信息 返回跳转地址 Boss genius
  let url = user.get('userType') === 'BOSS' ? '/boss' : '/genius'
  if (!user.get('avatar')) url += 'info'
  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}