import { redirect } from "next/navigation";

// This standalone route is kept only so old bookmarks/links to
// /apply/delegate don't 404. The actual Delegate application form now lives
// in a modal on the homepage (see DelegateModal.jsx, opened from the
// Applications section), which is the supported entry point going forward.
export default function DelegateApplicationRedirect() {
  redirect("/#contact");
}
