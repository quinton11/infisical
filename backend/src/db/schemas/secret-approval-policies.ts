// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { TImmutableDBKeys } from "./models";

export const SecretApprovalPoliciesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  secretPath: z.string().nullable().optional(),
  approvals: z.number().default(1),
  envId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  enforcementLevel: z.string().default("hard")
});

export type TSecretApprovalPolicies = z.infer<typeof SecretApprovalPoliciesSchema>;
export type TSecretApprovalPoliciesInsert = Omit<z.input<typeof SecretApprovalPoliciesSchema>, TImmutableDBKeys>;
export type TSecretApprovalPoliciesUpdate = Partial<
  Omit<z.input<typeof SecretApprovalPoliciesSchema>, TImmutableDBKeys>
>;
