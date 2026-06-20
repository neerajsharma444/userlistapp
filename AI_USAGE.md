# AI Usage Transparency

## AI Tools Used
- Gemini 3.1 Pro 

## Major Prompts Used
- "Generate boilerplate for the User List React Native project with Redux and React Navigation."
- "Implement RTK query configuration and custom hooks for the paginated users API."

## Files/Components Primarily Generated Using AI
- `src/services/api.ts`
- `src/hooks/useGetUsers.ts`
- `src/navigation/AppNavigator.tsx`

## Files/Components Significantly Modified Manually
- `src/screens/UserListScreen.tsx`
- `src/screens/UserDetailScreen.tsx`
- `src/components/UserListItem.tsx`

## Challenges & Resolutions
- **Challenge:** Managing infinite scrolling state seamlessly alongside pull-to-refresh while avoiding duplicate requests.
- **Resolution:** Used RTK Query with a custom hook to handle caching and pagination logic, merging incoming data cleanly.
