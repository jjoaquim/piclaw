import { parsePostPayload, storePost } from "../posts-service.js";
export async function handlePost(channel, req, isReply, chatJid) {
    let data;
    try {
        data = await req.json();
    }
    catch {
        return channel.json({ error: "Invalid JSON" }, 400);
    }
    const parsed = parsePostPayload(data);
    if (!parsed.ok || !parsed.data)
        return channel.json({ error: parsed.error }, 400);
    const result = storePost(channel, chatJid, parsed.data, { isReply });
    return channel.json(result.body, result.status);
}
