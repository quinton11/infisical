// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { zodBuffer } from "@app/lib/zod";

import { TImmutableDBKeys } from "./models";

export const CertificateAuthorityCertsSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  caId: z.string().uuid(),
  encryptedCertificate: zodBuffer,
  encryptedCertificateChain: zodBuffer,
  version: z.number(),
  caSecretId: z.string().uuid()
});

export type TCertificateAuthorityCerts = z.infer<typeof CertificateAuthorityCertsSchema>;
export type TCertificateAuthorityCertsInsert = Omit<z.input<typeof CertificateAuthorityCertsSchema>, TImmutableDBKeys>;
export type TCertificateAuthorityCertsUpdate = Partial<
  Omit<z.input<typeof CertificateAuthorityCertsSchema>, TImmutableDBKeys>
>;
