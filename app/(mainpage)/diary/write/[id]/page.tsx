import EditWriteDiary from "@/components/diary/Dedit";

export default function Page() {
  return (
    <section className="flex flex-col sm:gap-y-20 w-3/4 mx-auto">
      <h3 className="text-xl text-center p-9">일기 수정</h3>
      <EditWriteDiary />
    </section>
  );
}
