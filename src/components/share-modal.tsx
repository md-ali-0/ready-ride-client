import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
    id: string;
}

export function ShareModal({ id }: ShareModalProps) {
    const copytoClipboard = () => {
        const url = `${window.location.origin}/bike-details/${id}`;
        navigator.clipboard.writeText(url);
        toast.success("Link Copied");
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} className="text-slate-800 dark:text-slate-200">
                    <Share2 size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share </DialogTitle>
                    <DialogDescription>Share this link via</DialogDescription>
                </DialogHeader>
                <div className="border rounded-md flex justify-between items-center py-2 gap-2 px-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="fill-gray-500 ml-2"
                    >
                        <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z" />
                        <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z" />
                    </svg>
                    <input
                        className="w-full outline-none bg-transparent"
                        type="text"
                        placeholder="link"
                        readOnly
                        defaultValue={`${window.location.origin}/bike-details/${id}`}
                    />
                    <DialogClose asChild>
                        <Button onClick={copytoClipboard} variant={"outline"}>
                            Copy
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
