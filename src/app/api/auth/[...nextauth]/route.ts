import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? ''
        })
    ],
    callbacks: {
        async jwt({token, account}) {
          if (account) {
            token = Object.assign({}, token, { access_token: account.access_token });
          }
          
          return token
        },
        async session({session, token}) {
        if(session) {
          session = Object.assign({}, session, {access_token: token.access_token})
          }
        return session
        }
      }
})

export { handler as GET, handler as POST }