import { redirect } from "next/navigation";

// This standalone route is kept only so old bookmarks/links to /apply/admin
// don't 404. The actual Admin application form now lives in a modal on the
// homepage (see AdminModal.jsx, opened from the Applications section), which
// is the supported entry point going forward.
export default function AdminApplicationRedirect() {
  redirect("/#contact");
}
