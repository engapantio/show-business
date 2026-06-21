import { useMutation } from '@tanstack/react-query';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function submitContactForm(payload: ContactPayload): Promise<ContactPayload> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 700);
  });
}

export function useContactSubmitMutation() {
  return useMutation({
    mutationFn: submitContactForm,
  });
}
