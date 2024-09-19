import { NDKUserProfile } from '@nostr-dev-kit/ndk'

const DEFAULTS = {
    USER_NAME: 'Anon',
    AVATAR: require('../assets/default_avatar.png'),
}
export const ProfileInline = ({ profile }: { profile: NDKUserProfile }) => (
    <>
        <img src={profile.image || DEFAULTS.AVATAR} alt="" className="w-5 h-5 bg-purple-50 rounded-full" />
        <p className="font-bold">{profile.displayName || DEFAULTS.USER_NAME}</p>
    </>
)
