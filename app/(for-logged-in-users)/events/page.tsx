import { getEvents } from "@/actions/getEvents";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import EventList from "@/components/events-components/EventList";
import { SortEvents } from "@/components/events-components/SortEvents";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<JSX.Element> {
  const searchparams = await searchParams;
  // Extract sortBy from searchParams
  const sortBy = (typeof searchparams.sortBy === "string" ? searchparams.sortBy : "recent") as "recent" | "popular";

  // Fetch initial events
  const initialEvents = await getEvents(1, sortBy);

  return (
    <ContentLayout title="Events">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Events</h1>
          <SortEvents sortBy={sortBy} />
          <EventList initialEvents={initialEvents} sortBy={sortBy} />
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
