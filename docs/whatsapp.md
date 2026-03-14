# WhatsApp integration (optional)

The primary interface is the web UI. WhatsApp is a secondary, opt‑in channel for chat‑style access.

## Pairing

Start `piclaw` and scan the QR code shown in the logs. In headless environments, use a pairing code by setting a phone number:

```bash
WHATSAPP_PHONE=1234567890
```

You can also store it in `/workspace/.piclaw/config.json`:

```json
{ "whatsappPhone": "1234567890" }
```

## Triggering the agent

`piclaw` only responds when the trigger name is present:

```
@PiClaw
```

Set a custom name via `.piclaw/config.json`:

```json
{
  "assistant": {
    "assistantName": "PiClaw"
  }
}
```

## Notes

- If `WHATSAPP_PHONE` is not set (empty or unset), piclaw skips all WhatsApp connection attempts. A no‑op stub is used internally so the web UI and other channels work normally without noisy reconnect logs.
- WhatsApp state is persisted in SQLite and the session store, so reconnects are usually seamless.
- If you do not need WhatsApp, simply leave `WHATSAPP_PHONE` unset; the web UI still works.

See [runtime-flows.md](runtime-flows.md) for the web‑first flow and [architecture.md](architecture.md) for component context.
