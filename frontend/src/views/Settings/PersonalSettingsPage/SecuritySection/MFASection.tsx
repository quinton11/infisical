import { createNotification } from "@app/components/notifications";
import { Checkbox, EmailServiceSetupModal } from "@app/components/v2";
import { useGetUser, useUpdateMfaEnabled } from "@app/hooks/api";
import { useFetchServerStatus } from "@app/hooks/api/serverDetails";
import { AuthMethod } from "@app/hooks/api/users/types";
import { usePopUp } from "@app/hooks/usePopUp";

export const MFASection = () => {
  const { data: user } = useGetUser();
  const { mutateAsync } = useUpdateMfaEnabled();
  
  const { handlePopUpToggle, popUp, handlePopUpOpen } = usePopUp(["setUpEmail"] as const);

  const { data: serverDetails } = useFetchServerStatus();

  const toggleMfa = async (state: boolean) => {
    try {
      if (!user) return;
      if (user.authMethods.includes(AuthMethod.LDAP)) {
        createNotification({
          text: "Two-factor authentication is not available for LDAP users.",
          type: "error"
        });
        return;
      }

      const newUser = await mutateAsync({
        isMfaEnabled: state
      });

      createNotification({
        text: `${
          newUser.isMfaEnabled
            ? "Successfully turned on two-factor authentication."
            : "Successfully turned off two-factor authentication."
        }`,
        type: "success"
      });
    } catch (err) {
      createNotification({
        text: "Something went wrong while toggling the two-factor authentication.",
        type: "error"
      });
      console.error(err);
    }
  };

  return (
    <>
      <form>
        <div className="mb-6 max-w-6xl rounded-lg border border-mineshaft-600 bg-mineshaft-900 p-4">
          <p className="mb-8 text-xl font-semibold text-mineshaft-100">Two-factor Authentication</p>
          {user && (
            <Checkbox
              className="data-[state=checked]:bg-primary"
              id="isTwoFAEnabled"
              isChecked={user?.isMfaEnabled}
              onCheckedChange={(state) => {
                if (serverDetails?.emailConfigured) {
                  toggleMfa(state as boolean);
                } else {
                  handlePopUpOpen("setUpEmail");
                }
              }}
            >
              Enable 2-factor authentication via your personal email.
            </Checkbox>
          )}
        </div>
      </form>
      <EmailServiceSetupModal
        isOpen={popUp.setUpEmail?.isOpen}
        onOpenChange={(isOpen) => handlePopUpToggle("setUpEmail", isOpen)}
      />
    </>
  );
};
