import { PageContainer } from "@ant-design/pro-components";

function Example() {
  return (
    <>
      <PageContainer
        header={{
          title: "",
        }}
        breadcrumb={{}}
        className="bg-[#fff]"
        content={<p className="text-[30px]">Content Example children</p>}
      />
    </>
  );
}

export default Example;
