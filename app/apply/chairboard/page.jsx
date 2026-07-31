import { redirect } from "next/navigation";

// This standalone route is kept only so old bookmarks/links to
// /apply/chairboard don't 404. The actual Chairboard application form now
// lives in a modal on the homepage (see ChairboardModal.jsx, opened from the
// Applications section), which is the supported entry point going forward.
export default function ChairboardApplicationRedirect() {
  redirect("/#contact");
}
