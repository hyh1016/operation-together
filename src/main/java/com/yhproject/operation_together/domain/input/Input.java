package com.yhproject.operation_together.domain.input;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.operation.Operation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Input extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(nullable = false)
    private int position;

    @Column(length = 50, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "operation_id")
    private Operation operation;

    @Builder
    private Input(String name, int position, String content) {
        this.name = name;
        this.position = position;
        this.content = content;
    }
}
