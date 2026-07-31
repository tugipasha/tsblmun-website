import { redirect } from "next/navigation";

// This standalone route is kept only so old bookmarks/links to /apply/press
// don't 404. The actual Press application form now lives in a modal on the
// homepage (see PressModal.jsx, opened from the Applications section), which
// is the supported entry point going forward.
export default function PressApplicationRedirect() {
  redirect("/#contact");
}
