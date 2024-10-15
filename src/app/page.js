import Image from "next/image"
import UserProjects from "../components/UserProjects/UserProjects"
import NewProjectsShow from "../components/NewProjectsShow/NewProjectsShow"
import Footer from "../components/Footer/Footer"

const index = async () => {
  return (
    <div className="py-12 text-foreground container px-2 sm:px-8">
      <div className="mx-auto flex flex-col-reverse md:flex-row items-center justify-between sm:px-6 min-h-[500px]">
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">Online Code Editor & Static Website Hoisting</h1>
          <p className="my-6">
            Host Your website created with HTML, CSS, Javascript. We also provide code editor <b>VS Code</b> for editing code inside your project.
          </p>
          <div className="flex gap-x-3">
            <a href="/newproject" className="btn btn-primary"><span className="loading loading-ball loading-sm"></span>Host Now</a>

            <a href="/editor" className="btn btn-secondary"><span className="loading loading-infinity loading-sm"></span>Code Editor</a>
          </div>

        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="/code.webp" alt="Free Tools Akdevz Hero Image" width={500} height={500} className="w-full max-w-xl" />
        </div>
      </div>

      <UserProjects />

      <div className="Newset Projects">
        <h2 className="my-4 text-2xl font-bold mx-2">Newest Projects By Active Users</h2>
        <NewProjectsShow />
      </div>
      <div className="mx-auto py-8 px-4">
        <p className="mb-6">
          Welcome to the ultimate solution for developers! Our platform combines an intuitive online code editor and
          a reliable static website hosting service. Whether you&#39;re building a personal project, learning how to code,
          or deploying a static website, we have the perfect tools for you. With real-time collaboration, fast website
          deployment, and seamless code editing, our platform streamlines the development process for beginners and experts alike.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Online Code Editor?</h2>
        <p className="mb-6">
          Our online code editor is designed with ease of use and powerful features in mind. You can code in multiple languages,
          collaborate with team members, and deploy your static website with just a few clicks. No need for complex setups or
          external hosting services.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>I Editor These Languages have rich IntelliSense and validation
            JavaScript,
            TypeScript,
            LESS,
            JSON,
            CSS,
            SCSS,
            HTML</li>
          <li>And These languages with only basic syntax colorization
            XML,
            PHP,
            C#,
            C++,
            Razor,
            Markdown,
            Diff,
            Java,
            VB,
            CoffeeScript,
            Handlebars,
            Batch,
            Pug,
            F#,
            Lua,
            Powershell,
            Python,
            Ruby,
            SASS,
            R,
            Objective-C</li>
          <li>Instant deployment for static websites</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Fast and Reliable Static Website Route Hosting</h2>
        <p className="mb-6">
          Deploy your static website in seconds with our lightning-fast hosting. Your projects will be live with custom route
          and SSL encryption, ensuring your website is secure and accessible across the globe.
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>SSL certified domain</li>
          <li>Custom route support</li>
          <li>High-speed content delivery</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-4">
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-lg font-medium">
              What programming languages does the online code editor support?
            </summary>
            <div className="collapse-content">
              <p>Our online code editor supports various programming languages including HTML, CSS, JavaScript, Python, Ruby, and more. We aim to provide a versatile coding environment for developers of all backgrounds.</p>
            </div>
          </details>

          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-lg font-medium">
              How fast can I deploy my website?
            </summary>
            <div className="collapse-content">
              <p>You can deploy your website within seconds after completing your code. Our platform is optimized for instant deployments, meaning your static website will be live almost immediately after hitting host.</p>
            </div>
          </details>

          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-lg font-medium">
              Do you provide SSL certificates for hosted websites route?
            </summary>
            <div className="collapse-content">
              <p>Yes! Every website route hosted on our platform have an SSL certificate. This ensures your site is secure and trusted by users worldwide.</p>
            </div>
          </details>

          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-lg font-medium">
              Can I collaborate with others using the code editor?
            </summary>
            <div className="collapse-content">
              <p>No! Our online code editor not yet offers real-time collaboration features, We working to imrovement and adding more features.</p>
            </div>
          </details>

          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title text-lg font-medium">
              Is there a limit on how many projects I can deploy?
            </summary>
            <div className="collapse-content">
              <p>There are no limits on how many static websites you can deploy. Our platform is designed to support multiple projects, making it ideal for developers and businesses with extensive portfolios.</p>
            </div>
          </details>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default index