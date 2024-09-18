import { NostrEvent } from '@nostr-dev-kit/ndk'

export const event1: NostrEvent = {
    created_at: 1726584421,
    content: 'Home sweet home',
    tags: [
        ['S', 'r:http://localhost:3000/'],
        ['K', 'r:http://localhost:3000'],
        ['s', 'r:http://localhost:3000/'],
        ['k', 'r:http://localhost:3000'],
    ],
    kind: 1111,
    pubkey: '37264347030d919dc6735838d18d140cc315140af0684150a846318f7c1a7d59',
    id: '65eab3425dc8aa1b501cf78d0f3e595d15cbcf8f33509c2f93766b28a0d4278b',
    sig: 'a2bb7f8e14b00d6fe8243e067ca4261e3f062e12b2039cd5308431bab23cdcf16847bb708eb77e7d58f4409878587587921688e50a0ad7d3364fdc849ec4ad00',
}
