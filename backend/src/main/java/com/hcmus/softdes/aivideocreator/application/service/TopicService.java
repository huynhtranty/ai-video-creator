package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.infrastructure.external.wiki.WikipediaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    private final WikipediaService fetchTopics;

    private static final List<String> DEFAULT_TOPICS = List.of(
        "Trí tuệ nhân tạo",
        "Biến đổi khí hậu",
        "Truyện cổ tích Việt Nam",
        "Công nghệ thông tin",
        "Máy tính lượng tử",
        "Khám phá vũ trụ",
        "Công nghệ chuỗi khối",
        "Năng lượng tái tạo",
        "Y học chính xác",
        "Thực phẩm bền vững",
        "Thành phố thông minh",
        "An ninh mạng",
        "Thực tế ảo và thực tế tăng cường",
        "Xe tự lái",
        "Công nghệ sinh học",
        "Tài chính phi tập trung (DeFi)",
        "Thương mại điện tử",
        "Giáo dục trực tuyến",
        "Truyện ăn khế trả vàng",
        "Truyện ngôn tình",
        "Truyện kiếm hiệp",
        "Truyện ngắn",
        "Truyện kinh dị"
    );

    public TopicService(WikipediaService wikipediaService) {
        this.fetchTopics = wikipediaService;
    }

    public String execute(String keyword, int lines) {
        return fetchTopics.getShortSummary(keyword, lines);
    }

    public List<String> getTrendingTopics() {
        return DEFAULT_TOPICS;
    }
}
